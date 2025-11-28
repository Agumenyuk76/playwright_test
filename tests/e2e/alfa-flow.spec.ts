import { test } from '@playwright/test';
import { AlfaSteps } from '../../steps/alfa.steps';

test('Полный E2E: Альфа → Создание → Проверка → Удаление', async ({ page, request }) => {
  const alfaSteps = new AlfaSteps(page, request);

  let productVersionAlfaId: string;

  await test.step('1. Включение Альфа признака', async () => {
    await alfaSteps.enableAlphaInProject();
  });

  await test.step('2. Создание альфы через API', async () => {
    productVersionAlfaId = await alfaSteps.createAlfaViaApi();
  });

  await test.step('3. Проверка альфы в UI', async () => {
    await alfaSteps.verifyAlfaInUI(productVersionAlfaId);
  });

  //   await test.step('4. Удаление альфы в UI', async () => {
  //     await alfaSteps.deleteAlfaInUI(productVersionAlfaId);
  //   });
});

test('Негатив E2E: Альфа → Создание без тоггла ', async ({ page, request }) => {
  const alfaSteps = new AlfaSteps(page, request);

  let productVersionAlfaId: string;

  await test.step('1. Выключение Альфа признака', async () => {
    await alfaSteps.disableAlphaInProject();
  });

  await test.step('2. Создание альфы через API', async () => {
    productVersionAlfaId = await alfaSteps.uncreateAlfaViaApi();
  });

  //   await test.step('4. Удаление альфы в UI', async () => {
  //     await alfaSteps.deleteAlfaInUI(productVersionAlfaId);
  //   });
});
