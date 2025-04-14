function domReady(
	readyStates: DocumentReadyState[] = ['complete', 'interactive'],
) {
	return new Promise<void>((resolve) => {
		if (readyStates.includes(document.readyState)) {
			resolve();
		} else {
			document.addEventListener('readystatechange', () => {
				if (readyStates.includes(document.readyState)) {
					resolve();
				}
			});
		}
	});
}

const safeDOM = {
	append(parent: HTMLElement, child: HTMLElement) {
		if (!Array.from(parent.children).includes(child)) {
			parent.appendChild(child);
		}
	},
	remove(parent: HTMLElement, child: HTMLElement) {
		if (Array.from(parent.children).includes(child)) {
			parent.removeChild(child);
		}
	},
};

/**
 * https://tobiasahlin.com/spinkit
 * https://connoratherton.com/loaders
 * https://projects.lukehaas.me/css-loaders
 * https://matejkustec.github.io/SpinThatShit
 */
function useLoadingSpinner() {
	const className = `booktracker-spinner`;
	const style = document.createElement('style');
	style.id = 'booktracker-loading-style';
	style.innerHTML = `
@keyframes book-spin {
  25% { transform: perspective(100px) rotateX(180deg) rotateY(0); }
  50% { transform: perspective(100px) rotateX(180deg) rotateY(180deg); }
  75% { transform: perspective(100px) rotateX(0) rotateY(180deg); }
  100% { transform: perspective(100px) rotateX(0) rotateY(0); }
}
.${className} > div {
  width: 50px;
  height: 50px;
  background: #fff;
  animation: book-spin 2s infinite cubic-bezier(0.09, 0.57, 0.49, 0.9);
}
.booktracker-loading {
  position: fixed;
  top: 0; left: 0;
  width: 100vw;
  height: 100vh;
  background: #1e1e1e;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 9999;
}
`;

	const spinner = document.createElement('div');
	spinner.className = 'booktracker-loading';
	spinner.innerHTML = `<div class="${className}"><div></div></div>`;

	return {
		append() {
			safeDOM.append(document.head, style);
			safeDOM.append(document.body, spinner);
		},
		remove() {
			safeDOM.remove(document.head, style);
			safeDOM.remove(document.body, spinner);
		},
	};
}

export { domReady, useLoadingSpinner };
