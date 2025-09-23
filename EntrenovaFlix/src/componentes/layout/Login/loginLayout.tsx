import { useDisclosure } from '@mantine/hooks';
import { Popover, Fieldset, TextInput, Button, Group, PasswordInput, Stack, Box, Text } from '@mantine/core';
import { Link } from 'react-router-dom'; 
import '../../../styles/login.css'; 

export default function LgSection() {
    const [visible, { toggle }] = useDisclosure(false);

    return (
        <Box className='loginBoxWrapper'> 
            <Fieldset className='fieldSet' legend='Login'>
                
                <Text className='welcomeText'>Olá, bem-vindo de volta</Text>

                <TextInput 
                    label="CPF" 
                    placeholder="00000000000" 
                    size='md'
                    withAsterisk
                    classNames={{
                        label: 'loginInputLabel',
                        input: 'loginInputField'
                    }}
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
                        input: 'loginInputField'
                    }}
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

                <Button fullWidth size='md' className='loginButton'>Entrar</Button>
            </Fieldset>
        </Box>
    );
}