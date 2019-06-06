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
  let children = '';

  for (let i of window.route) {
    let paths = i.path.split('/');

    children += `
    <div class="tab ${i.isFocused ? 'selected' : ''}">
      <img src="/assets/ic-img/html.png" class="ic-default mr4">
      <div class="mr4">${paths[paths.length - 1]}.html</div>
      <span class="material-icons small-icon close-icon">close</span>
      <div class="bottom-border"></div>
    </div>
    `
  }
  node.innerHTML = children;
}

function drawToolbar (node) {
  let res = window.route.filter(i => i.isFocused)[0];
  let path = res.path.split('/');
  let children = '';

  for (let i = 0; i < path.length; i++) {
    children += `
      <img src="/assets/ic-img/right-arrow.png" class="ic-right">
      <div class="flex">
        <img class="ic-default mr4" src="${i < path.length - 1 ? '/assets/ic-img/folder.png' : '/assets/ic-img/html.png'}">
        <div>${i < path.length - 1 ? path[i] : path[i] + '.html'}</div>
      </div>
    `
  }
  node.innerHTML = children;

}
