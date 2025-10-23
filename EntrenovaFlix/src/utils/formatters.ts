export const formataCNPJ = (value: string) => {
    const numeros = value.replace(/\D/g, '');

    return numeros
        .slice(0, 14)
        .replace(/(\d{2})(\d)/, '$1.$2')
        .replace(/(\d{3})(\d)/, '$1.$2')
        .replace(/(\d{3})(\d)/, '$1/$2')
        .replace(/(\d{4})(\d)/, '$1-$2');
};


export const formataCEP = (value: string) => {
    const numeros = value.replace(/\D/g, '');

    return numeros
        .slice(0, 8)
        .replace(/(\d{5})(\d)/, '$1-$2');
};


export const formataCPF = (value: string) => {
    const numeros = value.replace(/\D/g, '');

    return numeros
        .slice(0, 11)
        .replace(/(\d{3})(\d)/, '$1.$2')
        .replace(/(\d{3})(\d)/, '$1.$2')
        .replace(/(\d{3})(\d{1,2})$/, '$1-$2');
};


export const formataTel = (value: string) => {
    const numeros = value.replace(/\D/g, '');
    const length = numeros.length;

    if (length <= 10) {
        return numeros
            .slice(0, 10)
            .replace(/(\d{2})(\d)/, '($1) $2')
            .replace(/(\d{4})(\d)/, '$1-$2');
    }
    
    return numeros
        .slice(0, 11)
        .replace(/(\d{2})(\d)/, '($1) $2')
        .replace(/(\d{5})(\d)/, '$1-$2');
};

export const formataNumCartao = (value: string) => {
    const cleaned = value.replace(/\D/g, '');
    const limited = cleaned.slice(0, 16);
    
    return limited.replace(/(\d{4})(?=\d)/g, '$1 ').trim();
};


export const formataData= (value: string) => {
    const cleaned = value.replace(/\D/g, '');

    return cleaned
        .slice(0, 4)
        .replace(/(\d{2})(\d)/, '$1/$2');
};

export const formataCVV = (value: string) => {
    return value.replace(/\D/g, '').slice(0, 4);
};