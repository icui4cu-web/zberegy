function lockButtons(buttons, state) {
	buttons.forEach(btn => {
		btn.classList.toggle('_loading', state)
		btn.disabled = state
	})
}

function resetErrors(form) {
	form.querySelectorAll('.form__group').forEach(group => {
		const modifiedErrorEl = group.querySelector('.form__error[data-default-message]')

		if(modifiedErrorEl) {
			modifiedErrorEl.textContent = modifiedErrorEl.dataset.defaultMessage
		}

		group.classList.remove('form__group_invalid')
		group.querySelector('._invalid')?.classList.remove('_invalid')
	})
}

function showServerErrors(form, errors) {
	errors.forEach(error => {
		const field = form.elements[error.field]

		if (field) {
			const formGroup = field.closest('.form__group')
			const errorElement = formGroup.querySelector('.form__error')

			if (!errorElement.dataset.defaultMessage) {
				errorElement.dataset.defaultMessage = errorElement.textContent.trim()
			}

			errorElement.textContent = error.message
			formGroup.classList.add('form__group_invalid')
			field.classList.add('_invalid')
		}
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

		const result = await response.json();

		if (!response.ok) {
			if (result.errors && Array.isArray(result.errors)) {
				showServerErrors(form, result.errors)
			}
			throw new Error(`HTTP error! status: ${response.status}`)
		}

		return result

	} catch (error) {
		console.error('Ошибка отправки формы:', error)
		throw error

	} finally {
		lockButtons(submitButtons, false)
	}
}

document.querySelectorAll('.form').forEach(form => {
	form.addEventListener('submit', async event => {
		event.preventDefault()
		resetErrors(form);
		form.classList.add('_validated')

		if (!form.checkValidity()) {
			event.stopPropagation()
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