# README

**Описание:**

Реализовать компонент `<Poll pollID={pollID} />`, который инкапсулирует в себе логику работы с опросами

**Вводные:**

Репозиторий с готовым серверным приложением и скелетом клиентского приложения

**Требования:**

-   Получение конфига опроса с сервера.
-   Рендер опроса по полученному конфигу.
-   Отправка пользовательских событий `answer/finish` на сервер.

**Доп. требования:**

-   Сохранять состояние частично пройденного опроса при перезагрузке страницы
-   Обеспечить надежность доставки пользовательских событий. Например, у пользователя может отвалиться интернет, пока он едет в лифте
-   Отправка событий “просмотра” вопроса/страницы. Хотим понимать увидел ли пользователь определенный вопрос или страницу

**Структура репозитория**

````
/src
	Create React App + Typescript
	Material UI
/mocks
	Моки ручек на основе mocks-server
````

**Описание эндпоинтов**

````
- `GET /api/poll/<pollID>`
  - Формат ответа
    ```tsx
    {
    	id: string;
    	questions: {
    		[id: number]: {
    			id: number;
    			label: string;
    			type: 'choice' | 'rating';

    			isMulti?: boolean;
    			options?: {
    				id: number;
    				label: string;
    			}

    			maxValue?: number;
    		}
    	}

    	pages: {
    		[id: number]: {
    			questions: number[];
    		}
    	}

    	pageOrder: number[];
    }
    ```
- `POST /api/poll/<pollID>/answer`
  - Формат запроса
    ```tsx
    {
    	questionID: number;
    	value: number | number[];
    	timestamp: number;
    }
    ```
- `POST /api/poll/<pollID>/finish`
  - Формат запроса
    ```tsx
    {
      timestamp: number;
    }
    ```
- `POST /api/poll/<pollID>/stats`
  - Формат запроса
    ```tsx
    {
      event: 'show_question' | 'show_page';
      id: number;
      timestamp: number;
    }
    ```
````
