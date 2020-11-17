CREATE TABLE tblBooks (
	AccessnNum INT,
	BookTitle VARCHAR(35),
	Copyright INT,
	AuthCode VARCHAR(2)
);

CREATE TABLE tblAuthors (
	AuthorCode VARCHAR(2),
	AuthorName VARCHAR(15),
	AuthorLocation VARCHAR(2),
);

CREATE TABLE tblBorrowDetails (
	BorrowTransactionNum INT,
	AccessDate DATE,
	SN INT,
	AccessNumber INT
);

CREATE TABLE tblStudents (
	StudNum INT,
	FirstName VARCHAR(10),
	LastName VARCHAR(10),
	Course VARCHAR(10),
	YearLevel INT
);

INSERT INTO tblBooks VALUES
(123, 'database managenent', 1999, 'A4'),
(124, 'program logic', 1980, 'A2'),
(125, 'history', 1978, 'A2'),
(126, 'rizal', 1950, 'A1'),
(127, 'dmath', 1989, 'A4');

INSERT INTO tblAuthors VALUES
('A1', 'ramesh', 'uk'),
('A2', 'hoffer', 'us'),
('A3', 'topi', 'us'),
('A4', 'mcfadden', 'uk'),
('A5', 'malik', 'sg');

INSERT INTO tblBorrowDetails VALUES
(1, '2017-02-02', 901, 123),
(2, '2017-02-02', 901, 123),
(3, '2017-02-02', 905, 126),
(4, '2017-02-02', 903, 127);


INSERT INTO tblStudents VALUES
(901, 'shirley', 'de leon', 'cs', 1),
(902, 'shann', 'moraga', 'it', 2),
(903, 'shermae', 'villa', 'cs', 4),
(904, 'bong', 'batac', 'it', 3),
(905, 'thomas', 'castro', 'act', 4);

SELECT tblStudents.StudNum, tblStudents.FirstName, tblBorrowDetails.SN, 
	tblBorrowDetails.AccessNumber, tblBooks.BookTitle, tblAuthors.AuthorCode,
	tblAuthors.AuthorName
FROM ((( tblStudents
INNER JOIN tblBorrowDetails ON tblStudents.StudNum=tblBorrowDetails.SN)
RIGHT JOIN tblBooks ON tblBorrowDetails.AccessNumber=tblBooks.AccessnNum)
LEFT JOIN tblAuthors ON tblAuthors.AuthorCode=tblBooks.AuthCode);

SELECT *
FROM ((( tblStudents
LEFT JOIN tblBorrowDetails ON tblStudents.StudNum=tblBorrowDetails.SN)
RIGHT JOIN tblBooks ON tblBorrowDetails.AccessNumber=tblBooks.AccessnNum)
FULL JOIN tblAuthors ON tblAuthors.AuthorCode=tblBooks.AuthCode);

SELECT tblStudents.StudNum, tblStudents.FirstName, tblBorrowDetails.SN, 
	tblBorrowDetails.AccessNumber, tblBooks.BookTitle, tblAuthors.AuthorCode,
	tblAuthors.AuthorName
FROM ((( tblStudents
FULL JOIN tblBorrowDetails ON tblStudents.StudNum=tblBorrowDetails.SN)
LEFT JOIN tblBooks ON tblBorrowDetails.AccessNumber=tblBooks.AccessnNum)
RIGHT JOIN tblAuthors ON tblAuthors.AuthorCode=tblBooks.AuthCode);