$.confirm = function (options) {
    return new Promise((resolve, reject) => {
        const modal = $.modal({
            title: options.title,
            closeable: false,
            width: '400px',
            content: options.content,
            onClose() {
                modal.destroy();
            },
            footerButtons: [
                {
                    text: 'Cancel', type: 'secondary', handler() {
                        modal.close();
                        reject();
                    }
                },
                {
                    text: 'Delete', type: 'danger', handler() {
                        modal.close();
                        resolve();
                    }
                }
            ]
        })
        setTimeout(() => { modal.open() }, 200);
    });
}