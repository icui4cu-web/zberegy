// netlify/functions/submit-form.js

exports.handler = async (event, context) => {
	// CORS заголовки
	const headers = {
		'Content-Type': 'application/json',
		'Access-Control-Allow-Origin': '*',
		'Access-Control-Allow-Headers': 'Content-Type, Accept',
		'Access-Control-Allow-Methods': 'POST, OPTIONS',
		'Access-Control-Max-Age': '86400'
	};

	// Обработка preflight запроса
	if (event.httpMethod === 'OPTIONS') {
		return {
			statusCode: 200,
			headers
		};
	}

	// Разрешаем только POST запросы
	if (event.httpMethod !== 'POST') {
		return {
			statusCode: 405,
			headers,
			body: JSON.stringify({ error: 'Метод не дозволений' })
		};
	}

	try {
		// Парсим тело запроса (может быть JSON или URL-encoded)
		let data;
		const contentType = event.headers['content-type'] || '';

		if (contentType.includes('application/json')) {
			data = JSON.parse(event.body);
		} else {
			// Парсим FormData (URL-encoded)
			const params = new URLSearchParams(event.body);
			data = Object.fromEntries(params);
		}
		const { name, email, subject, message } = data;

		// Массив для ошибок валидации
		const errors = [];

		// Валидация полей
		if (!name || name.trim().length < 2) {
			errors.push({
				field: 'name',
				message: "Поле \"Ім'я\" є обов'язковим (backend message)"
			});
		}

		if (!email || email.trim().length < 2) {
			errors.push({
				field: 'email',
				message: "Поле \"Email\" є обов'язковим (backend message)"
			});
		}

		if (!subject || subject.trim().length < 2) {
			errors.push({
				field: 'subject',
				message: "Поле \"Тема\" є обов'язковим (backend message)"
			});
		}

		if (!message || message.trim().length < 2) {
			errors.push({
				field: 'message',
				message: "Поле \"Повідомлення\" є обов'язковим (backend message)"
			});
		}

		// Если есть ошибки, возвращаем их
		if (errors.length > 0) {
			return {
				statusCode: 400,
				headers,
				body: JSON.stringify({ errors })
			};
		}

		return {
			statusCode: 200,
			headers,
			body: JSON.stringify({
				success: true,
				message: 'Форма успішно відправлена!'
			})
		};

	} catch (error) {
		// Обработка ошибок парсинга JSON или других ошибок
		return {
			statusCode: 500,
			headers,
			body: JSON.stringify({
				error: 'Помилка обробки запиту',
				details: error.message
			})
		};
	}
};