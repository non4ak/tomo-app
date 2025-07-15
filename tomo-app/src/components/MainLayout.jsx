export default function MainLayout({children}) {
    return (
        <main className="w-full mx-auto lg:max-w-[1280px] space-y-10 mt-8 ">
            {children}
        </main>
    )
}