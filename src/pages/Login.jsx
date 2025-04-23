import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import {
  Container,
  Paper,
  Title,
  Stack,
  TextInput,
  PasswordInput,
  Button,
  Anchor,
  Text,
} from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { useAuth } from "../contexts/AuthContext";

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordVisibility, { toggle }] = useDisclosure(false);
  const { login } = useAuth();
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      await login(email, password);
      navigate('/');
    } catch (error) {
      console.log(error.message);
      setError(error.message);
    }

    navigate('/');
  };

  return (
    <Container size={360}>
      <Title order={2} mb="md">С возвращением</Title>

      <Paper shadow="sm" p="xl" radius="md">
        <form className="form" onSubmit={handleLogin}>
          <Stack>
            <TextInput
              label="Почта"
              value={email}
              onChange={(e) => setEmail(e.currentTarget.value)}
              size="md"
              radius="md"
              type="email"
              name="email"
              withAsterisk={false}
              required
              placeholder="Введите почту"
              autoFocus
            />

            <PasswordInput
              label="Пароль"
              value={password}
              onChange={(e) => setPassword(e.currentTarget.value)}
              visible={passwordVisibility}
              onVisibilityChange={toggle}
              size="md"
              radius="md"
              type="password"
              name="password"
              withAsterisk={false}
              required
              placeholder="Введите пароль"
            />

            <Button radius="xl" type="submit" mt="xs">Войти</Button>
          </Stack>

          <Text size="sm" mt="md">
            Нет аккаунта?{' '}
            <Anchor component={Link} to="/register" size="sm">
              Зарегистрироваться
            </Anchor>
          </Text>
        </form>
      </Paper>
    </Container>
  )
};

export default Login;