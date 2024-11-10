import MainLayout from "@/app/layouts/MainLayout";

export default function CreatingProductLayout({children}) {
    return (
        <div className="container my-0 mx-auto h-screen">
            <MainLayout>
                {children}
            </MainLayout>
        </div>
    );
}