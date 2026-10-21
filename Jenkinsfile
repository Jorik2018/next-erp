pipeline {
    agent any

    options {
        timestamps()
        disableConcurrentBuilds()
    }

environment {
    SERVICE_ID = 'next-erp'
    SERVICE_NAME = 'Next ERP'
    SERVICE_DESCRIPTION = 'Next.js ERP Application'

    DEPLOY_DIR = 'D:\\apps\\next-erp'

    PORT = '7787'
    BASE_PATH = '/next'

    VAULT_PATH = '/global'

    PNPM = 'D:\\tools\\pnpm\\pnpm.exe'
    APPWRITE_DATABASE_ID = '6ad7bdf00025763c0c20'
}

    stages {

        // ============================================================
        // 1. Check environment
        // ============================================================

        stage('Check Environment') {
            steps {
                bat '''
                    echo ==========================================
                    echo NODE
                    echo ==========================================

                    node --version

                    echo ==========================================
                    echo NPM
                    echo ==========================================

                    npm --version

                    echo ==========================================
                    echo PNPM
                    echo ==========================================

                    pnpm --version

                    echo ==========================================
                    echo GIT
                    echo ==========================================

                    git --version
                '''
            }
        }

        // ============================================================
        // 2. Stop service
        // ============================================================

        stage('Stop Service') {
            steps {
                bat '''
                    "%PYTHON_HOME%\\python.exe" ^
                        "%SERVICE_MANAGER%" ^
                        stop ^
                        "%SERVICE_ID%"

                    exit /B 0
                '''
            }
        }

        // ============================================================
        // 3. Deploy files
        // ============================================================

        stage('Deploy Files') {
            steps {
                powershell '''
                    $source = $env:WORKSPACE
                    $destination = $env:DEPLOY_DIR

                    if (-not (Test-Path $destination)) {
                        New-Item `
                            -ItemType Directory `
                            -Path $destination `
                            -Force | Out-Null
                    }

                    robocopy `
                        $source `
                        $destination `
                        /MIR `
                        /XD ".git" "node_modules" ".next" `
                        /XF ".env" ".env.local"

                    $code = $LASTEXITCODE

                    # Robocopy 0-7 = OK
                    if ($code -gt 7) {
                        throw "Robocopy failed with exit code $code"
                    }

                    exit 0
                '''
            }
        }

        // ============================================================
        // 4. Install dependencies
        // ============================================================

stage('Install Dependencies') {
    steps {
        bat '''
            cd /D "%DEPLOY_DIR%"

            echo ==========================================
            echo Installing dependencies
            echo ==========================================

            "%PNPM%" install --frozen-lockfile

            if errorlevel 1 (
                echo ERROR: pnpm install failed.
                exit /B 1
            )
        '''
    }
}
        // ============================================================
        // 5. Build Next.js
        // ============================================================

stage('Build Application') {
    steps {
        withCredentials([
            string(
                credentialsId: 'VAULT_TOKEN',
                variable: 'VAULT_TOKEN'
            )
        ]) {
            bat '''
                cd /D "%DEPLOY_DIR%"

                SET "NODE_ENV=production"
                SET "PROD=true"
                SET "BASE_PATH=%BASE_PATH%"
                SET "VAULT_ADDR=%VAULT_ADDR%"
                SET "VAULT_PATH=%VAULT_PATH%"
                SET "VAULT_TOKEN=%VAULT_TOKEN%"

                echo ==========================================
                echo Building Next ERP
                echo ==========================================

                "%PNPM%" build

                if errorlevel 1 (
                    echo ERROR: Next.js build failed.
                    exit /B 1
                )
            '''
        }
    }
}
        // ============================================================
        // 6. Verify build
        // ============================================================

        stage('Verify Build') {
            steps {
                bat '''
                    cd /D "%DEPLOY_DIR%"

                    echo ==========================================
                    echo Verifying Next.js build
                    echo ==========================================

                    if not exist ".next" (
                        echo ERROR: .next directory does not exist.
                        exit /B 1
                    )

                    if not exist ".next\\BUILD_ID" (
                        echo ERROR: Next.js BUILD_ID does not exist.
                        exit /B 1
                    )

                    echo Next.js build OK.
                '''
            }
        }

        // ============================================================
        // 7. Configure Windows service
        // ============================================================

stage('Configure Service') {
    steps {
        withCredentials([
            string(
                credentialsId: 'VAULT_TOKEN',
                variable: 'VAULT_TOKEN'
            )
        ]) {
            bat '''
                echo ==========================================
                echo Configuring Next ERP Windows service
                echo ==========================================

                "%PYTHON_HOME%\\python.exe" ^
                    "%SERVICE_MANAGER%" ^
                    install ^
                    "%SERVICE_ID%" ^
                    "%DEPLOY_DIR%" ^
                    --name "%SERVICE_NAME%" ^
                    --description "%SERVICE_DESCRIPTION%" ^
                    --depends-on Vault ^
--executable "%PNPM%" ^
--args "start -p %PORT%" ^
                    --env "NODE_ENV=production" ^
                    --env "PORT=%PORT%" ^
                    --env "BASE_PATH=%BASE_PATH%" ^
                    --env "VAULT_ADDR=%VAULT_ADDR%" ^
                    --env "DATABASE=PGNEONDB" ^
                    --env "VAULT_PATH=%VAULT_PATH%" ^
                    --env "VAULT_TOKEN=%VAULT_TOKEN%"

                if errorlevel 1 (
                    echo ERROR: Service configuration failed.
                    exit /B 1
                )
            '''
        }
    }
}

        stage('Start Service') {
            steps {
                bat '''
                    echo ==========================================
                    echo Starting Next ERP
                    echo ==========================================

                    "%PYTHON_HOME%\\python.exe" ^
                        "%SERVICE_MANAGER%" ^
                        start ^
                        "%SERVICE_ID%"

                    if errorlevel 1 (
                        echo ERROR: Could not start Next ERP.
                        exit /B 1
                    )
                '''
            }
        }

        // ============================================================
        // 9. Verify service
        // ============================================================

        stage('Verify Service') {
            steps {
                bat '''
                    echo ==========================================
                    echo Checking Windows service
                    echo ==========================================

                    "%PYTHON_HOME%\\python.exe" ^
                        "%SERVICE_MANAGER%" ^
                        status ^
                        "%SERVICE_ID%"

                    if errorlevel 1 (
                        echo ERROR: Next ERP service is not running.
                        exit /B 1
                    )

                    echo ==========================================
                    echo Checking port %PORT%
                    echo ==========================================

                    netstat -ano | findstr ":%PORT%"

                    if errorlevel 1 (
                        echo ERROR: Next ERP is not listening on port %PORT%.
                        exit /B 1
                    )
                '''
            }
        }

stage('Health Check') {
    steps {
        powershell '''
            $url = "http://127.0.0.1:$env:PORT$env:BASE_PATH"

            $maxAttempts = 10

            for ($attempt = 1; $attempt -le $maxAttempts; $attempt++) {

                Write-Host "Health check $attempt/$maxAttempts"
                Write-Host $url

                try {
                    $response = Invoke-WebRequest `
                        -UseBasicParsing `
                        -Uri $url `
                        -TimeoutSec 5

                    if ($response.StatusCode -eq 200) {
                        Write-Host "Next ERP OK"
                        exit 0
                    }

                    Write-Host "HTTP status: $($response.StatusCode)"
                }
                catch {
                    Write-Host "Next ERP not available yet."
                    Write-Host $_.Exception.Message
                }

                Start-Sleep -Seconds 3
            }

            throw "Next ERP did not respond to health check."
        '''
    }
}
    }

    post {

        success {
            echo '=========================================='
            echo 'Next ERP deployed successfully.'
            echo 'Internal port: 7785'
            echo 'Public base path: /next'
            echo 'Nginx must publish: https://DOMAIN/next/'
            echo '=========================================='
        }

        failure {
            echo '=========================================='
            echo 'Next ERP deployment failed.'
            echo '=========================================='
        }
    }
}