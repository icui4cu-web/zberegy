function lockButtons(buttons, state) {
	buttons.forEach(btn => {
		btn.classList.toggle('_loading', state)
		btn.disabled = state
	})
}

async function submitForm(form) {
	const submitButtons = form.querySelectorAll('button[type="submit"], button:not([type])')

	try {
		lockButtons(submitButtons, true)

		const formData = new FormData(form)
		const data = Object.fromEntries(formData);
		const response = await fetch(form.action, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				'Accept': 'application/json'
			},
			body: JSON.stringify(data)
		})

		if (!response.ok) {
			throw new Error(`HTTP error! status: ${response.status}`)
		}

		const result = await response.json();
		return result

	} catch (error) {
		console.error('Ошибка отправки формы:', error)
		throw error

	} finally {
		lockButtons(submitButtons, false)
	}
}

document.querySelectorAll('[data-form]').forEach(form => {
	form.addEventListener('submit', async event => {
		event.preventDefault()

		if (!form.checkValidity()) {
			event.stopPropagation()
			form.classList.add('_validated')
			return
		}

		try {
			const result = await submitForm(form)
			console.log('Форма успешно отправлена:', result)
		} catch (error) {
			console.error('Не удалось отправить форму:', error)
		}
	}, false)
})