import { useDisclosure } from '@mantine/hooks';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Popover, Fieldset, TextInput, Button, Group, PasswordInput, Stack, Box, Text } from '@mantine/core';
import { Link } from 'react-router-dom'; 
import { loginSchema, type LoginFormData } from './schemaZod';
import '../../../styles/login.css'; 


export default function LgSection() {
    const [visible, { toggle }] = useDisclosure(false);

    const { 
        register, 
        handleSubmit, 
        formState: { errors } 
    } = useForm<LoginFormData>({
        resolver: zodResolver(loginSchema)
    });

    const handleLogin = (data: LoginFormData) => {
        console.log("Login válido!", data);
        alert(`Login com ${data.email} realizado com sucesso!`);
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