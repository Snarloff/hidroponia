import InstitutoFederal from '@tcc/assets/InstitutoFederal.png'
import Image from 'next/image'

export function Footer() {
  return (
    <footer className="h-max w-full border-t border-backgroundGray bg-transparent p-9">
      <div className="container mx-auto flex flex-col items-center justify-between gap-8 md:flex-row md:gap-0">
        <Image src={InstitutoFederal.src} width={200} height={200} alt="Logo da escola Instituto Federal" />
        <p className="font-medium leading-tight text-white/90">
          2023 ©️ Luís Henrique Estareli, Cauã Calciolari, Matheus Nunes, João Márcio, Pedro Inocente, Ícaro Matheus <br />
          Projeto de TCC do curso de Técnico em Mecatrônica do Instituto Federal de São Paulo - Câmpus Catanduva. <br /> <br />
          <span className="italic text-muted-foreground">
            Desenvolvimento de uma horta hidropônica automatizada e web monitorada.
          </span>
        </p>
      </div>
    </footer>
  )
}
