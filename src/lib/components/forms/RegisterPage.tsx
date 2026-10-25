// src/components/forms/Registerpage.tsx

import { redirect } from "next/navigation";

import {
  getPatient,
  getUser,
} from "@/lib/actions/patient.actions";

import RegisterForm from "@/lib/components/forms/RegisterForm";

interface RegisterPageProps {
  userId: string;
}

const RegisterPage = async ({
  userId,
}: RegisterPageProps) => {
  const user = await getUser(userId);
  const patient = await getPatient(userId);

  if (patient) {
    redirect(
      `/patients/${userId}/new-appointment`
    );
  }

  return (
    <main className="min-h-screen bg-slate-50">
      <header className="border-b border-slate-200 bg-white">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-5">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-600 font-bold text-white">
              C
            </div>

            <div>
              <p className="font-semibold text-slate-900">
                CarePulse
              </p>

              <p className="text-xs text-slate-500">
                Patient Portal
              </p>
            </div>
          </div>

          <p className="hidden text-sm text-slate-500 sm:block">
            Secure patient registration
          </p>
        </div>
      </header>

      <section className="mx-auto max-w-5xl px-5 py-10 md:px-8 md:py-14">
        <RegisterForm user={user} />
      </section>

      <footer className="border-t border-slate-200 bg-white">
        <div className="mx-auto max-w-6xl px-6 py-6 text-center text-sm text-slate-500">
          © 2026 CarePulse · Patient Portal
        </div>
      </footer>
    </main>
  );
};

export default RegisterPage;