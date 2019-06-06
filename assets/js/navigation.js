window.route = [];

function refresh () {
  let toolbarCont = document.getElementById('toolbar-cont');
  removeChildNode(toolbarCont);
  drawToolbar(toolbarCont);

  let sectionHeaderCont = document.getElementById('section-header-cont');
  removeChildNode(sectionHeaderCont);
  drawSectionHeader(sectionHeaderCont);
}

function removeChildNode (node) { while (node.firstChild) node.removeChild(node.firstChild); }

function drawSectionHeader (node) {
  if (window.route.length === 0) {
    node.classList.add('none');
    return;
  }
  else node.classList.remove('none');

  for (let i of window.route) {
    let tab = document.createElement('div');
    tab.classList.add('tab');

    let ic = document.createElement('img');
    ic.src = '/assets/ic-img/html.png';
    ic.classList.add('ic-default', 'mr4');

    let name = document.createElement('div');
    name.classList.add('mr4');
    let paths = i.path.split('/');
    name.innerText = `${paths[paths.length - 1]}.html`;

    let close = document.createElement('span');
    close.classList.add('material-icons', 'small-icon', 'close-icon');
    close.innerText = 'close';

    let border = document.createElement('div');
    border.classList.add('bottom-border');

    tab.appendChild(ic);
    tab.appendChild(name);
    tab.appendChild(close);
    tab.appendChild(border);

    node.appendChild(tab);
  }
}

function drawToolbar (node) {
  let res = window.route.filter(i => i.isFocused)[0];

  let path = res.path.split('/');

  for (let i = 0; i < path.length; i++) {
    let arrow = document.createElement('img');
    arrow.src = '/assets/ic-img/right-arrow.png';
    arrow.classList.add('ic-right');

    let div = document.createElement('div');
    div.classList.add('flex');

    let ic = document.createElement('img');
    ic.src = i < path.length - 1 ? '/assets/ic-img/folder.png' : '/assets/ic-img/html.png';
    ic.classList.add('ic-default', 'mr4');

    let name = document.createElement('div');
    name.innerText = i < path.length - 1 ? path[i] : path[i] + '.html';

    div.appendChild(ic);
    div.appendChild(name);

    node.appendChild(arrow);
    node.appendChild(div);
  }

}
