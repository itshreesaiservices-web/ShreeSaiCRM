import { getClients } from "@/app/(crm)/actions/clients";
import { ClientList } from "@/components/crm/clients/ClientList";

export const metadata = {
  title: "Clients | CRM",
};

export default async function ClientsPage() {
  const clients = await getClients();
  
  return (
    <ClientList initialClients={clients} />
  );
}
