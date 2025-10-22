import { auth } from "@/auth.config";
import { Title } from "@/components";
import { redirect } from "next/navigation";

export default async function ProfilePage() {
    const session = await auth();
    //En el curso actualmente
    // if(!session?.user) {
    //     redirect('/');
    // }
    if(!session?.user) {
        redirect('/auth/login');
    }
    return (
        <div>
            <Title title="Perfil"/>
            <pre>
                {JSON.stringify(session?.user, null, 2)}
            </pre>
        </div>
    );
}   