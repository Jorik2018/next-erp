interface VaultSecretResponse {
  data: {
    data: Record<string, string>;
  };
}


export async function getVaultSecret(
  path: string
): Promise<Record<string, string>> {
  const vaultAddr = process.env.VAULT_ADDR;
  const vaultToken = process.env.VAULT_TOKEN;

  if (!vaultAddr) {
    throw new Error("VAULT_ADDR is required");
  }

  if (!vaultToken) {
    throw new Error("VAULT_TOKEN is required");
  }

  const response = await fetch(
    `${vaultAddr}/v1/secret/data/${path}`,
    {
      headers: {
        "X-Vault-Token": vaultToken,
      },
      cache: "no-store",
    }
  );

  if (!response.ok) {
    throw new Error(
      `Vault request failed with status ${response.status}`
    );
  }

  const result =
    (await response.json()) as VaultSecretResponse;

  return result.data.data;
}