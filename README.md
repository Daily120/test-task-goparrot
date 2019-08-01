#Routes
/authors (:GET)
/authors (:POST)
/authors/:authorId (:GET)
/authors/:authorId (:PUT)
/authors/:authorId (:DELETE)
/authors/:authorId/books (:GET)
/authors/:authorId/books (:POST)
/authors/:authorId/books/:bookId (:GET)
/authors/:authorId/books/:bookId (:PUT)
/authors/:authorId/books/:bookId (:DELETE)


#Examples of requests

/authors (:POST)
firstName:Jaweler
lastName:Tuty
birthday:1975-06-07T00:00:00.700Z

/authors/:authorId (:PUT)
firstName:JackPP
lastName:London
birthday:2017-06-07T00:00:00.700Z

/authors/:authorId/books (:POST)
title:Book
iban:54564565466556654
publishedAt:2017-06-07T00:00:00.700Z

/authors/:authorId/books/:bookId (:PUT)
title:UpdatedTitle
iban:545645654665564522
publishedAt:2008-06-07T00:00:00.700Z
