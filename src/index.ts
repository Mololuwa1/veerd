import { startScheduledJobs } from './triggers/scheduled';
import { startEventListeners } from './triggers/eventBased';

console.log('');
console.log('  Veerd Content Automation Engine');
console.log('  ================================');
console.log('');

startScheduledJobs();
startEventListeners();

console.log('');
console.log('  Engine running. Waiting for triggers...');
console.log('');
