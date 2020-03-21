# Beertrade

## Autorzy

Jacek Gosztyła

Szymon Rogus

Bartłomiej Łagosz

## 1. Informacje ogólne
### Nazwa kodowa projektu
Beertrade
### Temat
Aplikacja webowa do zamawiania produktów (np. piwa), która zakłada dynamiczną zmianę cen w zależności od popytu.
### Kto jest klientem
Klientem jest właściciel baru kraftowego, który ma zamiar w swoim barze wprowadzić model biznesowy sprzedaży piw, których cena zmienia się dynamicznie poprzez system działania rynku.



## 2. Problem: 
### Co jest do zrobienia:

Celem pracy jest stworzenie aplikacji webowej realizującej symulację rynkową cen produktów oferowanych dla danej społeczności (np.: w lokalu gastronomicznym) poprzez automatyczne modyfikowanie ceny w zależności od popytu na dany produkt. Aplikacja udostępniać ma interfejsy klienckie pozwalające na składanie zamówień i przedstawiającej aktualne ceny oraz główny wyświetlacz prezentujący aktualną ofertę. Do opracowania jest algorytm modyfikujący ceny.

### Dla kogo (kto to będzie używał)

Aplikacja przeznaczona jest dla danej klienteli lokalu wykorzystującego aplikację oraz dla pracowników.

## 3. Koncepcja systemu: 
Model systemu, który zastosujemy to MVC.
- Model zapewni możliwość persystencji danych o użytkownikach, aktualnych cenach, produktach i dokumentowanej historii zamówień, obrotu z danego przedziału czasowego.
- Widoki i kontrolery zapewnią interakcję z użytkownikiem (zarówno barmanem, kelnerami, klientami jak i właścicielem baru)
- Dodatkowo system na bieżąco w tle będzie wykonywał takie zadania, jak:
    - kolejkowanie zamówień
    - dynamiczne obliczanie cen piw w zależności od popytu

## 4. Wymagania funkcjonalne: 

### Użytkownicy systemu: 
- Klient
- Barman
- Właściciel
- Kelner (opcjonalnie)

### Główne funkcje:
- Rejestracja/logowanie do systemu. [klient, barman, właściciel, kelner]
- Wybór stolika z którym powiązane będą zamóienia. [klient]
- Wyświetlanie listy produktów do zakupu. [klient]
- Możliwość zamówienia produktu oraz analizy jego szczegółów, w tym ceny [klient]
- Obserwacja zamówień konkretnych stolików. [barman]
- Modyfikacja cen produktów w zależności od popytu.
- Obserwacja stanu długu klienta. [klient, kelner / barman]
- Bilans baru danego dnia, statystki sprzedaży produktów. [właściciel]
- (Opcjonalnie) Zamówienia dla niezarejestrowanych użytkowników. [kelner]

### Rozszerzenia implementowane przy wystarczającej ilości zasobów czasowych:
- Grywalizacja, zdobywanie odznaczeń
- Wykorzystanie kodów QR
- Zintegrowanie karty debetowej
- Rabaty, punkty dla użytkowników

## 5.  Koncepcja interfejsu użytkownika

- Logowanie

![](https://i.imgur.com/j6Y4CLV.png)

- Wybór stolika

![](https://i.imgur.com/BmSzEmh.png)

- Widok listy produktów do zamówienia

![](https://i.imgur.com/7yDmUEJ.png)

- Szczegóły produktu

![](https://i.imgur.com/SfypxVz.png)

- Stan stolików

![](https://i.imgur.com/ivBcu71.png)





## 6. Wymagania niefunkcjonalne:

- Możliwość obsługi wielu klientów w czasie rzeczywistym
- Możliwość rozszerzenia aplikacji dla nowego użytkownika - kelnera
- Przyjazne i przejrzyste interfejsy dla użytkowników
- Prosta obsługa
- Wykorzystanie User Experience Design przy projektowaniu interfejsów użytkowanika
- Optymalność i wydajność systemu kolejkowania zamówień i obliczania cen piwa w zależności od popytu

## 7. Zespół:
Cały proces tworzenia aplikacji zostanie podzielony według implementacji modułów, z których chronologicznie będzie korzystał użytkownik podczas używania systemu, czyli:

**Milestone 1:** Rejestracja/logowanie 1

**Milestone 2:** Wybór stolika 2

**Milestone 3:** Wyświetlanie listy produktów

**Milestone 4:** Zamówienie produktów + szczegóły

**Milestone 5:** Obserwacja zamówień konkretnych stolików

**Milestone 6:** Modyfikacja cen produktów w zależności od popyt

**Milestone 7:** Obserwacja stanu długu klienta

**Milestone 8:** Bilans dnia + statystyki

**(Opcjonalnie) Milestone 9:** Zamówienia dla niezarejestrowanych użytkowników

To podział milestone'ów do podstawowych funkcjonalności aplikacji. Dalszy podział utworzymy, jeśli starczy zasobów czasowych na rozszerzenia aplikacji.

## 8. Koncepcja technologiczna:
**Backend:** Java, Spring, Lombok, Sl4jf i inne biblioteki wspomagające javowe aplikacje webowe

**Frontend:** Angular 9.0 / React.js 16

**Persystencja:** PostgreSQL

**ORM:** Hibernate

***Plusy:***

- minimalizacja ilości kodu dzięki bibliotekom wspomagającym
- wsparcie obiektowości (szczególnie lombok)
- kontener IoC Springa

***Minusy:***

- ograniczenia ORM w kontekście operacji bazodanowych

## 9. Ryzyko: 

Zdajemy sobie sprawę ze stopnia skomplikowania projektu.
Potencjalne problemy to:

- Implementacja dobrego algorytmu symulującego ceny rynkowe (zależność popytu od podaży)
- Odpowiednie kolejkowanie zamówień i obsługa wielu klientów (system rozproszony)

Plan B:

Ograniczenie funkcjonalności pewnych widoków.