import { Outlet, Link, useNavigate } from "react-router-dom";
import {
  AppShell,
  Group,
  Button,
  Anchor,
  Title,
  Flex
} from '@mantine/core';
import { useAuth } from "../contexts/AuthContext";

const Layout = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <AppShell
      header={{ height: 77 }}
      footer={{ height: 58 }}
      padding="xl"
    >
      <AppShell.Header p="md" className="header">
        <Flex align="center" justify="space-between">
          <Title mr="xl">Shakh do</Title>
          <Group gap="md">
            <Anchor component={Link} to="/" underline="hover">
              Задачи
            </Anchor>

            {user ? (
              <>
                <Anchor component={Link} to="/profile" underline="hover">
                  Профиль
                </Anchor>
                <Button radius="xl" onClick={handleLogout}>
                  Выйти
                </Button>
              </>
            ) : (
              <Anchor component={Link} to="/login" underline="hover">
                Войти
              </Anchor>
            )}
          </Group>
        </Flex>
      </AppShell.Header>
      <AppShell.Main className="main">
        <Outlet />
      </AppShell.Main>
      <AppShell.Footer p="md" className="footer">
        Сделано с интересом⚡
      </AppShell.Footer>
    </AppShell>
  )
};

export default Layout;