// lib/components/pages/MyAppointmentsPage.tsx

import { getAppointmentsByUser } from "@/lib/actions/appointment.actions";

export default async function MyAppointmentsPage({
    userId,
}: {
    userId: string;
}) {
    const appointments = await getAppointmentsByUser(userId);

    return (
        <main className="min-h-screen bg-slate-50">
            <header className="border-b border-slate-200 bg-white">
                <div className="mx-auto max-w-5xl px-6 py-5">
                    <p className="text-lg font-semibold text-slate-900">
                        CarePulse
                    </p>

                    <p className="text-sm text-slate-500">
                        Patient Portal
                    </p>
                </div>
            </header>

            <section className="mx-auto max-w-5xl px-6 py-10">
                <div className="mb-8">
                    <h1 className="text-3xl font-bold text-slate-900">
                        My appointments
                    </h1>

                    <p className="mt-2 text-slate-500">
                        View and manage your appointment requests.
                    </p>
                </div>

                {appointments.length === 0 ? (
                    <div className="rounded-xl border border-slate-200 bg-white p-10 text-center">
                        <p className="font-medium text-slate-900">
                            No appointments yet
                        </p>

                        <p className="mt-1 text-sm text-slate-500">
                            Your appointments will appear here.
                        </p>
                    </div>
                ) : (
                    <div className="space-y-4">
                        {appointments.map(
                            (appointment: any) => (
                                <article
                                    key={appointment.$id}
                                    className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm"
                                >
                                    <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
                                        <div>
                                            <p className="font-semibold text-slate-900">
                                                {
                                                    appointment.primaryPhysician
                                                }
                                            </p>

                                            <p className="mt-1 text-sm text-slate-500">
                                                {new Date(
                                                    appointment.schedule
                                                ).toLocaleString()}
                                            </p>

                                            <p className="mt-3 text-sm text-slate-600">
                                                {appointment.reason}
                                            </p>
                                        </div>

                                        <AppointmentStatus
                                            status={
                                                appointment.status
                                            }
                                        />
                                    </div>
                                </article>
                            )
                        )}
                    </div>
                )}
            </section>
        </main>
    );
}

function AppointmentStatus({
    status,
}: {
    status: string;
}) {
    const styles =
        status === "scheduled"
            ? "bg-emerald-50 text-emerald-700"
            : status === "cancelled"
                ? "bg-red-50 text-red-700"
                : "bg-amber-50 text-amber-700";

    return (
        <span
            className={`w-fit rounded-full px-3 py-1 text-sm font-medium capitalize ${styles}`}
        >
            {status}
        </span>
    );
}