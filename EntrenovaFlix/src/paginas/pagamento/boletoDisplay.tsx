const codigoBarrasNumerico = "12345678901234567890123456789012345678901234";
const codigoBarrasFormatado = "12345.67890 12345.678901 12345.678902 1 12345678901234";

export default function BoletoDisplay() {
    const handleCopyBoletoCode = () => {
        navigator.clipboard.writeText(codigoBarrasNumerico)
            .then(() => alert('Código do boleto copiado para a área de transferência!'))
            .catch(err => console.error('Erro ao copiar código do boleto:', err));
    };
   
 return (
        <div className="pix-boleto-display">
            <h4>Pague com Boleto</h4>
            <p>Copie a linha digitável ou clique para baixar o boleto</p>
            <div className="copy-container boleto-code-container">
                 <code>{codigoBarrasFormatado}</code>
                 <button onClick={handleCopyBoletoCode} className="button-copy" title="Copiar Linha Digitável">
                 </button>
            </div>
            <button className="button-primary">
                Baixar Boleto
            </button>
        </div>
    );
}