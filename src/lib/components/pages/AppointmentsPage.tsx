import { StatCard } from "@/lib/components/StatCard";
import { columns } from "@/lib/components/table/columns";
import { DataTable } from "@/lib/components/table/DataTable";
import { getRecentAppointmentList } from "@/lib/actions/appointment.actions";

const AppointmentsPage = async () => {
  const appointments =
    await getRecentAppointmentList();

  return (
    <>
      {/* HEADER */}
      <section className="mb-8 w-full">
        <h1 className="text-3xl font-bold tracking-tight text-slate-900">
          Welcome 👋
        </h1>

        <p className="mt-2 text-slate-600">
          Start the day by managing new
          appointments.
        </p>
      </section>

      {/* STATS */}
      <section className="mb-8 grid w-full grid-cols-1 gap-5 md:grid-cols-3">
        <StatCard
          type="appointments"
          count={
            appointments.scheduledCount
          }
          label="Scheduled appointments"
          icon="/assets/icons/appointments.svg"
        />

        <StatCard
          type="pending"
          count={
            appointments.pendingCount
          }
          label="Pending appointments"
          icon="/assets/icons/pending.svg"
        />

        <StatCard
          type="cancelled"
          count={
            appointments.cancelledCount
          }
          label="Cancelled appointments"
          icon="/assets/icons/cancelled.svg"
        />
      </section>

      {/* TABLE */}
      <section className="w-full">
        <DataTable
          columns={columns}
          data={appointments.documents}
        />
      </section>
    </>
  );
};

export default AppointmentsPage;