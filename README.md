Test
======
Repozytorium kodu strony [www.pieszynski.com:4080](http://www.pieszynski.com:4080/).

####Do dodania:

* Przygotowanie strony z GIT+SSH (aktualnie tylko Ghist)
* Uzupełnienie wszystkich kości szkieletu osiowego i dodatkowego
* [Grunci](https://github.com/pieszynski/grunci) = Grunt + CI ( [typescript_grunt_task](https://github.com/ribose/dev-grunt-build) )
* Fikołek - przy starcie systemu NodeJs nie widzi globalnych pakietów (nawet po uruchomieniu pliku /etc/profile.d/node.sh) co uniemożliwia automatyczny start serwera przy starcie maszyny
* Wprowadzenie rejestracji kontrolerów na stronie
* Konfiguracja strony głównej na podstawie (select top x * from pages.json)
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

####Zrobione
* Strona główna i RSS na podstawie pages.json - zadanie GRUNT
* Problemy wydajnościowe ExpressJs.Static - problem dysków albo kolejek/strumieni wyjściowych (kopiowanie plików działa ok ale przy wysyłaniu większej ilości danych przez net (nawet do 'cat' co konsoli ssh) proces się kończy a dane się jeszcze wysyłają) na hostingu (branch "pstatic" potwierdza problemy z odczytem większych plików) :(
