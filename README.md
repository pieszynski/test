Test
======
Repozytorium kodu strony [www.pieszynski.com:4080](http://www.pieszynski.com:4080/).

####Do dodania:

* Problemy wydajnościowe ExpressJs.Static ...
* Przygotowanie strony z GIT+SSH (aktualnie tylko Ghist)
* Uzupełnienie wszystkich kości szkieletu osiowego i dodatkowego
* Konfiguracja strony głównej na podstawie (select top x * from pages.json)
* RSS (na podstawie pages.json)
    * pubDate must be an RFC-822 date-time: -- <pubDate>Wed, 02 Oct 2002 15:00:00 +0200</pubDate>
    * item should contain a guid element
    * insert a atom:link to your feed in the channel section
* [Grunci](https://github.com/pieszynski/grunci) = Grunt + CI ( [typescript_grunt_task](https://github.com/ribose/dev-grunt-build) )
* Fikołek - przy starcie systemu NodeJs nie widzi globalnych pakietów (nawet po uruchomieniu pliku /etc/profile.d/node.sh) co uniemożliwia automatyczny start serwera przy starcie maszyny
* Wprowadzenie rejestracji kontrolerów na stronie
* Buforowanie głównego szablonu strony
* Rozbudowa o system powiadomień w przeglądarce - ćwiczenie pamięci
* Słówka (pl, de, zdanie pl, zdanie de) z niemieckiego - do ćwiczeń + (aplikacja na Androida)
* youtube_dl
* Stworzenie automatycznego skryptu odtwarzającego wszystko na maszynie za raz po tym jak została na świeżo zainstalowana (instalacja wymaganych zależności apt-get, przygotowanie katalogów, skryptów startowych, rejestracja startowa, przygotowanie bazy, etc) - wszystko za pomocą jednego polecenia
* Przeniesienie pomocnych kawałków kodu z Dropboxa i sql_hints na stronę
* Zindeksowanie repozytorium linków, pobranie ich zawartości + wyciągnięcie esencji.
* Dynamiczna budowa kodu - Wyrażenia lambda i Expression.* + Emit
* Wtyczka do NodeJS - C++11
* MonoCecil
* Ormow
