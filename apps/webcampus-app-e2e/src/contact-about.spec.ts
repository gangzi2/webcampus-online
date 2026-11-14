import { expect, test } from '@playwright/test';

test('navigue vers les pages et envoie le formulaire de contact', async ({ page }) => {
  await page.route('**/api/contact', (route) => route.fulfill({ status: 204 }));
  await page.goto('/');
  const footer = page.getByRole('navigation', { name: 'Navigation de pied de page' });
  await footer.getByRole('link', { name: 'À propos' }).click();
  await expect(page).toHaveURL(/\/a-propos$/);
  await expect(page.getByRole('heading', { level: 1 })).toContainText('apprentissage');
  await page.getByRole('link', { name: 'Nous contacter' }).click();
  await expect(page).toHaveURL(/\/contact$/);
  await expect(page.getByRole('heading', { level: 1 })).toContainText('projet');

  await page.getByLabel('Nom complet').fill('Jean Dupont');
  await page.getByLabel('Adresse email').fill('jean@example.com');
  await page.getByLabel('Sujet').fill('Question');
  await page.getByLabel('Message').fill('Bonjour, voici une question.');
  await page.getByRole('button', { name: 'Envoyer le message' }).click();
  await expect(page.getByText('Message envoyé avec succès!')).toBeVisible();
});

test('les pages restent accessibles directement sur mobile', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto('/a-propos');
  await expect(page.getByRole('heading', { level: 1 })).toContainText('apprentissage');
  await page.getByRole('button', { name: 'Ouvrir le menu' }).click();
  await page.getByRole('banner').getByRole('link', { name: 'Contact' }).click();
  await expect(page).toHaveURL(/\/contact$/);
  await expect(page.getByLabel('Nom complet')).toBeVisible();
});
