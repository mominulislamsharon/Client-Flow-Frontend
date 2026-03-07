import ClientTable from "@/components/clients/ClientTable";
import CreateCleintModal from "@/components/clients/CreateCleintModal";

const ClientsPage = () => {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Clients</h1>
        <CreateCleintModal />
      </div>

      <ClientTable/>
    </div>
  );
};

export default ClientsPage;
