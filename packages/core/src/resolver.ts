import { ScaffoldForgeConfig, OrmEnum, DatabaseEnum, TestingEnum, E2eEnum, ModuleEnum } from '@scaffold-forge/config';

export function getFilteredOptions(config: Partial<ScaffoldForgeConfig>) {
  const allOrms = OrmEnum.options;
  const allDbs = DatabaseEnum.options;
  const allTests = TestingEnum.options;
  const allE2e = E2eEnum.options;
  const allModules = ModuleEnum.options;

  let filteredOrms = [...allOrms];
  let filteredDbs = [...allDbs];

  // Filter based on Database selection
  if (config.database === 'mongodb') {
    filteredOrms = filteredOrms.filter(orm => ['mongoose', 'prisma'].includes(orm));
  }
  if (config.database && ['postgres', 'mysql', 'mariadb', 'sqlite'].includes(config.database)) {
    filteredOrms = filteredOrms.filter(orm => orm !== 'mongoose');
  }

  // Filter based on ORM selection
  if (config.orm === 'mongoose') {
    filteredDbs = ['mongodb'];
  }
  if (config.orm && ['typeorm', 'kysely', 'sequelize'].includes(config.orm)) {
    filteredDbs = filteredDbs.filter(db => db !== 'mongodb');
  }

  // R10 Filter: Playwright + node-test incompatibility
  let filteredE2e = [...allE2e];
  if (config.testing === 'node-test') {
    filteredE2e = filteredE2e.filter(e => e !== 'playwright');
  }
  
  let filteredTests = [...allTests];
  if (config.e2e === 'playwright') {
    filteredTests = filteredTests.filter(t => t !== 'node-test');
  }

  return {
    orm: filteredOrms,
    database: filteredDbs,
    testing: filteredTests,
    e2e: filteredE2e,
    module: allModules,
  };
}