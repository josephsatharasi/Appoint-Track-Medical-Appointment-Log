import React, { useState, useEffect } from "react";
import { fetchAppointments, deleteAppointment } from "../../api/appointmentApi";
import AppointmentCard from "./AppointmentCard";
import AppointmentModal from "./AppointmentModal";
import NoAppointmentsWarning from "./NoAppointmentsWarning"; 
import Loading from "../Loading";  
import "../../styles/TrackAppointment.css";

const TrackAppointment = () => {
  const [appointments, setAppointments] = useState([]);
  const [selectedAppointment, setSelectedAppointment] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [statusFilter, setStatusFilter] = useState("");
  const [dateRange, setDateRange] = useState(null);
  const [sortOrder, setSortOrder] = useState("asc");
  const [isLoading, setIsLoading] = useState(true);  

  useEffect(() => {
    const loadAppointments = async () => {
      try {
        setIsLoading(true);
        const data = await fetchAppointments();
        setAppointments(Array.isArray(data) ? data : []);
      } catch (error) {
        console.error("Error fetching appointments:", error);
      } finally {
        setIsLoading(false);
      }
    };
    loadAppointments();
  }, []);

  const filteredAppointments = Array.isArray(appointments)
    ? appointments
        .filter((appointment) => {
          if (statusFilter && appointment.status !== statusFilter) return false;
          if (dateRange) {
            const appointmentDate = new Date(appointment.date);
            if (appointmentDate < dateRange.start || appointmentDate > dateRange.end) return false;
          }
          return true;
        })
        .sort((a, b) => {
          const dateA = new Date(a.date);
          const dateB = new Date(b.date);
          return sortOrder === "asc" ? dateA - dateB : dateB - dateA;
        })
    : [];

  const handleDelete = async (id) => {
    await deleteAppointment(id);
    setAppointments(appointments.filter((appointment) => appointment._id !== id));
    setSelectedAppointment(null);
  };

  const handleEdit = (appointment) => {
    setSelectedAppointment(appointment);
    setIsModalOpen(true);
  };

  const handleAppointmentClick = (appointment) => {
    setSelectedAppointment(appointment);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedAppointment(null);
  };

  const StatusFilter = () => (
    <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)}>
      <option value="">All Statuses</option>
      <option value="Upcoming">Upcoming</option>
      <option value="Completed">Completed</option>
      <option value="Cancelled">Cancelled</option>
    </select>
  );

  const DateRangeFilter = () => {
    const handleDateRangeChange = () => {
      const today = new Date();
      const next7Days = new Date(today);
      next7Days.setDate(today.getDate() + 7);
      setDateRange({ start: today, end: next7Days });
    };
    return <button onClick={handleDateRangeChange}>Filter for Next 7 Days</button>;
  };

  const SortFilter = () => (
    <select onChange={(e) => setSortOrder(e.target.value)}>
      <option value="asc">Sort by Appointment Date (Ascending)</option>
      <option value="desc">Sort by Appointment Date (Descending)</option>
    </select>
  );

  const resetFilters = () => {
    setStatusFilter("");
    setDateRange(null);
    setSortOrder("asc");
  };

  const AppointmentSummary = () => {
    const upcomingAppointments = filteredAppointments.filter(
      (appointment) =>
        appointment.status === "Upcoming" &&
        new Date(appointment.date) <= new Date(new Date().setDate(new Date().getDate() + 7))
    );
    return <h3>Upcoming Appointments (Next 7 days): {upcomingAppointments.length}</h3>;
  };

  return (
    <div className="track-appointment-container">
      <h2>Track Your Appointments</h2>

      {/* Show Loading Spinner While Fetching Data */}
      {isLoading ? (
        <Loading />  
      ) : (
        <>
          {/* Conditionally render the NoAppointmentsWarning component */}
          {appointments.length === 0 ? (
            <NoAppointmentsWarning />
          ) : (
            <>
              <div className="filters">
                <StatusFilter />
                <DateRangeFilter />
                <SortFilter />
                <button className="reset-btn" onClick={resetFilters}>
                  Reset Filters
                </button>
              </div>

              <AppointmentSummary />

              <table className="appointment-table">
                <thead>
                  <tr>
                    <th>Doctor</th>
                    <th>Date</th>
                    <th>Time</th>
                    <th>Reason</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredAppointments.map((appointment) => (
                    <tr
                      key={appointment._id}
                      onClick={() => handleAppointmentClick(appointment)}
                      className="appointment-row"
                    >
                      <td>{appointment.doctor}</td>
                      <td>{appointment.date}</td>
                      <td>{appointment.time}</td>
                      <td>{appointment.reason}</td>
                      <td>{appointment.status}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </>
          )}

          {selectedAppointment && (
            <AppointmentCard
              appointment={selectedAppointment}
              onClose={() => setSelectedAppointment(null)}
              onDelete={handleDelete}
              onEdit={handleEdit}
            />
          )}

          {isModalOpen && (
            <AppointmentModal
              appointment={selectedAppointment}
              closeModal={closeModal}
            />
          )}
        </>
      )}
    </div>
  );
};

export default TrackAppointment;
