import GraficoBarras from "../../componentes/layout/dashboard/GraficoBarras";

function DesenvolvimentoRH() {
    return (
        <div className="container-graficos-hobbies">
            <GraficoBarras titulo="Top hobbies" subtitulo="Hobbies mais populares entre os colaboradores" categorias={["Leitura", "Caminhada", "Cozinhar", "Esporte"]} valores={[20, 30, 12, 10]}/>
            <GraficoBarras titulo="Soft skills" subtitulo="Habilidades mais desenvolvidas pelos colaboradores" categorias={["Comunicação", "Liderança", "Agilidade", "Pontualidade"]} valores={[14, 15, 23, 17]}/>
        </div>
    )
}

export default DesenvolvimentoRH;