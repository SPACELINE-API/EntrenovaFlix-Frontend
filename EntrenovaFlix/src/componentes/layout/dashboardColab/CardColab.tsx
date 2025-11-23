function CardColab({ titulo, subtitulo, valor }: any) {
    return (
        <div className="card-colab">
            <h3 className="card-colab-titulo"><strong>{titulo}</strong></h3>
            <h3 className="card-colab-subtitulo">{subtitulo}</h3>

            <div className="barra-progresso">
                <div 
                    className="preenchido"
                    style={{ width: typeof valor === "number" ? `${valor}%` : valor }}
                ></div>

                <div className="barra-label">
                    <h3>Progresso</h3>
                    <h3>{valor}</h3>
                </div>
            </div>
        </div>
    );
}

export default CardColab;