export function Navbar() {
  return (
    <nav className="h-max w-full border-b border-backgroundGray bg-transparent p-8">
      <div className="container mx-auto flex flex-row justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white">TCC Hidroponia</h1>
        </div>
        <div>
          <ul className="hidden flex-row md:flex">
            <li className="px-4 text-lg text-white">Home</li>
            <li className="px-4 text-lg text-white">Sobre</li>
            <li className="px-4 text-lg text-white">Contato</li>
          </ul>
        </div>
      </div>
    </nav>
  )
}
