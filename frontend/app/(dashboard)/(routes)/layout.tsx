export default function Layout({
    children
}: {
    children: React.ReactNode
}) {
    return <div className="p-6 h-full">{children}</div>
}