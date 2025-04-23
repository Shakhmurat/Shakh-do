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

const Register = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordVisibility, { toggle }] = useDisclosure(false);
  const { register } = useAuth();
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();

    try {
      await register(email, password);
      alert('Регистрация успешна!');
      navigate('/');
    } catch (error) {
      console.log(error.message);
      setError(error.message);
    }
  };

  return (
    <Container size={360}>
      <Title order={2} mb="md">Создайте аккаунт</Title>

      <Paper shadow="sm" p="xl" radius="md">
        <form className="form" onSubmit={handleRegister}>
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
              description="Не менее 8 символов"
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
              placeholder="Придумайте пароль"
            />

            <Button radius="xl" type="submit" mt="xs">Зарегистрироваться</Button>
          </Stack>

          <Text size="sm" mt="md">
            Есть аккаунт?{' '}
            <Anchor component={Link} to="/login" size="sm">
              Войти
            </Anchor>
          </Text>
        </form>
      </Paper>
    </Container>
  )
};

export default Register;