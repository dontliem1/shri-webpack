import _ from 'lodash';
import {component1} from '../components/component1';
import {component2} from '../components/component2';
// import {component3} from '../components/component3';

function component() {
    const element = document.createElement('div');

    // Lodash, now imported by this script
    element.innerHTML = _.join(['Hello', 'webpack'], ' ');

    return element;
}

document.body.appendChild(component());
document.body.appendChild(component1());
document.body.appendChild(component2());