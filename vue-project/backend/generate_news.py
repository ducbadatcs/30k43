import json
from pydantic import BaseModel

# generate random dates
from datetime import date, timedelta, datetime
import random

class News(BaseModel):
    date: datetime
    title: str
    content: str
    category: list[str] = []
    


date_start, date_end = date(2015, 12, 31), date(2025, 1, 1)
dates_bet = date_end - date_start
total_days = dates_bet.days

with open("./dictionary.txt", "r") as file:
    words = [w.strip() for w in file.readlines() if w.strip()]
    
NEWS_LENGTH = 50
TITLE_LENGTH = 5
CONTENT_LENGTH = 100
CATEGORY_LENGTH = 10
CATEGORY_REPEAT = 3

words_cp = words.copy()
random.shuffle(words_cp)
categories = words_cp[:CATEGORY_LENGTH]

news_list = []

def random_time():
    return datetime(year=2025, month=1, day=1, 
                    hour=random.randint(0, 23), minute=random.randint(0, 59), 
                    second=random.randint(0, 59)).time()

for _ in range(NEWS_LENGTH):
    timestamp = datetime.combine(date_start + timedelta(days=random.randint(0, total_days)), random_time())
    title = " ".join(random.choice(words) for _ in range(TITLE_LENGTH))
    content = " ".join(random.choice(words) for _ in range(CONTENT_LENGTH)).capitalize()
    category = [random.choice(categories) for _ in range(CATEGORY_REPEAT)]
    news_list.append(News(date=timestamp, title=title, content=content, category=category))

news_json = json.dumps([n.model_dump() for n in news_list], default=str)

with open("../frontend/public/demo_news.json", "w") as file:
    file.write(news_json)
    
