import { useDisclosure } from '@mantine/hooks';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Popover, Fieldset, TextInput, Button, Group, PasswordInput, Stack, Box, Text } from '@mantine/core';
import { Link, useNavigate } from 'react-router-dom'; 
import { loginSchema, type LoginFormData } from './schemaZod';
import { supabase } from '../../../services/supabaseClient';
import '../../../styles/login.css'; 


export default function LgSection() {
    const [visible, { toggle }] = useDisclosure(false);
    const navigate = useNavigate();

    const { 
        register, 
        handleSubmit, 
        formState: { errors } 
    } = useForm<LoginFormData>({
        resolver: zodResolver(loginSchema)
    });

    const handleLogin = async (data: LoginFormData) => {
        const { email, senha } = data;

        const { data: sessionData, error } = await supabase.auth.signInWithPassword({
            email,
            password: senha,
        });

        if (error) {
            alert("Erro ao logar: " + error.message);
            console.error("Erro no login:", error);
            return;
        }

        console.log("Usuário logado:", sessionData.session?.user);
        alert(`Login com ${email} realizado com sucesso!`);

        
        navigate("/colaboradores/dashboard");
    };

     return (
        <Box className='loginBoxWrapper'> 
            <form onSubmit={handleSubmit(handleLogin)}>
                <Box className='loginBoxWrapper'> 
                    <Fieldset className='fieldSet' legend='Login'>
                        
                        <Text className='welcomeText'>Olá, bem-vindo de volta</Text>

                        <TextInput 
                            label="E-mail" 
                            placeholder="Email@.com" 
                            size='md'
                            withAsterisk
                            classNames={{
                                label: 'loginInputLabel',
                                input: 'loginInputField'
                            }}
                            {...register('email')}
                            error={errors.email?.message}
                        />
                        
                        <PasswordInput
                            label="Senha"
                            placeholder="Sua senha"
                            size='md'
                            withAsterisk
                            visible={visible}
                            onVisibilityChange={toggle}
                            classNames={{
                                label: 'loginInputLabel',
                                input: 'loginInputField',
                                innerInput: 'placeInp'
                            }}
                            {...register('senha')}
                            error={errors.senha?.message}
                        />
                        
                        <Group justify="space-between" mt="xs" mb="lg" gap={90}> 
                            <Link to="/esqueci-minha-senha" className='loginLink'>Esqueci a minha senha</Link>
                            <Popover width={300} position="right" withArrow shadow="md">
                                <Popover.Target>
                                    <span className='loginLink' style={{ cursor: 'pointer' }}>
                                        Ainda não tem uma conta?
                                    </span>
                                </Popover.Target>

                                <Popover.Dropdown className='popDrop'>
                                    <Stack>
                                        <Text ta='center' size="xs" className='popText'>Converse com o administrador responsável!</Text>
                                    </Stack>
                                </Popover.Dropdown>
                            </Popover>
                        </Group>

                        <Button type='submit' fullWidth size='md' className='loginButton'>Entrar</Button>
                    </Fieldset>
                </Box>
            </form>
        </Box>
    );
}