// console.log('hello duuudes');

setTimeout(() => {
  const copyIcons = document.querySelectorAll('.copy-to-clipboard');
  console.log({ copyIcons });

  for (let i = 0; i < copyIcons.length; i++) {
    const copyIcon = copyIcons[i];
    copyIcon.style.backgroundColor = 'inherit';

    const svgIcon = copyIcon.childNodes[0];
    console.log({ svgIcon });
    svgIcon.style.backgroundColor = 'inherit';
    svgIcon.style.color = 'black';
    svgIcon.innerHTML = `<use src="../../public/icons/copy-link.svg" ></use>`;
  }

  console.log('after', { copyIcons });
}, 100);
