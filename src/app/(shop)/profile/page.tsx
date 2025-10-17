import { auth } from "@/auth.config";
import { Title } from "@/components";

export default async function ProfilePage() {
    const session = await auth();

    return (
        <div>
            <Title title="Perfil"/>
            {
                JSON.stringify(session?.user)
            }
        </div>
    );
}