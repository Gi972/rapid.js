// import Rapid from './../rapid/rapid';
import { Rapid, Auth } from './../rapid/rapid';

window.Rapid = Rapid;

window.test = new Rapid({ modelName: 'test', debug: true, extension: 'xml' });
window.auth = new Auth({ modelName: 'user', debug: true });
