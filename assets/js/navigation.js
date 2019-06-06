window.route = [];

function refresh () {
  let toolbarCont = document.getElementById('toolbar-cont');
  removeChildNode(toolbarCont);
  drawToolbar(toolbarCont);
}

function removeChildNode (node) { while (node.firstChild) node.removeChild(node.firstChild); }

function drawToolbar (node) {
  let res = window.route.filter(i => i.isFocused)[0];

  let path = res.path.split('/');

  for (let i = 0; i < path.length; i++) {
    let arrow = document.createElement('img');
    arrow.src = '/assets/ic-img/right-arrow.png';
    arrow.classList.add('ic-right');

    let div = document.createElement('div');
    div.classList.add('flex');

    let folder = document.createElement('img');
    folder.src = i < path.length - 1 ? '/assets/ic-img/folder.png' : '/assets/ic-img/html.png';
    folder.classList.add('ic-default', 'mr4');

    let name = document.createElement('div');
    name.innerText = i < path.length - 1 ? path[i] : path[i] + '.html';

    div.appendChild(folder);
    div.appendChild(name);

    node.appendChild(arrow);
    node.appendChild(div);
  }

}
