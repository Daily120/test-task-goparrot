#Routes <br />
/authors (:GET)<br />
/authors (:POST)<br />
/authors/:authorId (:GET)<br />
/authors/:authorId (:PUT)<br />
/authors/:authorId (:DELETE)<br />
/authors/:authorId/books (:GET)<br />
/authors/:authorId/books (:POST)<br />
/authors/:authorId/books/:bookId (:GET)<br />
/authors/:authorId/books/:bookId (:PUT)<br />
/authors/:authorId/books/:bookId (:DELETE)<br />


#Examples of requests<br />

/authors (:POST)<br />
firstName:Jaweler<br />
lastName:Tuty<br />
birthday:1975-06-07T00:00:00.700Z<br />

/authors/:authorId (:PUT)<br />
firstName:JackPP<br />
lastName:London<br />
birthday:2017-06-07T00:00:00.700Z<br />

/authors/:authorId/books (:POST)<br />
title:Book<br />
iban:54564565466556654<br />
publishedAt:2017-06-07T00:00:00.700Z<br />

/authors/:authorId/books/:bookId (:PUT)<br />
title:UpdatedTitle<br />
iban:545645654665564522<br />
publishedAt:2008-06-07T00:00:00.700Z<br />
