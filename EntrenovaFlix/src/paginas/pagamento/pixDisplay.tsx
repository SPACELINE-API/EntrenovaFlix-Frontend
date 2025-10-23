const qrCodeImageUrl = "https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=PlaceholderPixQRCode12345";
const chavePix = "bf88b2a3-5c7a-43d8-accf-9d39cd8e79c1";

export default function PixDisplay() {
    const handleCopyPixKey = () => {
        navigator.clipboard.writeText(chavePix)
            .catch(err => console.error('Erro ao copiar chave Pix:', err));
    };

    return (
        <div className="pix-boleto-display">
            <h4>Pague com Pix</h4>
            <p>Escaneie o QR Code abaixo com o app do seu banco</p>
            <img src={qrCodeImageUrl} alt="QR Code Pix" className="qr-code-image" />
            <p>Ou copie a chave Pix:</p>
            <div className="copy-container pix-key-container">
                <code>{chavePix}</code>
                <button onClick={handleCopyPixKey} className="button-copy" title="Copiar Chave Pix">
                </button>
            </div>
        </div>
    );
}