# ************************************************************
# Sequel Pro SQL dump
# Version 4541
#
# http://www.sequelpro.com/
# https://github.com/sequelpro/sequelpro
#
# Host: 127.0.0.1 (MySQL 5.6.25)
# Database: opennamu
# Generation Time: 2016-05-13 00:20:41 +0000
# ************************************************************


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;


# Dump of table wiki_articles
# ------------------------------------------------------------

DROP TABLE IF EXISTS `wiki_articles`;

CREATE TABLE `wiki_articles` (
  `article_num` int(11) NOT NULL,
  `revision_num` int(11) NOT NULL,
  `article_title` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `article_hash` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `article_content` longtext COLLATE utf8mb4_unicode_ci NOT NULL,
  `article_last_ip` varchar(50) COLLATE utf8mb4_unicode_ci NOT NULL,
  `article_last_member_id` int(11) NOT NULL,
  `article_last_member_nickname` varchar(50) COLLATE utf8mb4_unicode_ci NOT NULL,
  `article_etc_info` varchar(1000) COLLATE utf8mb4_unicode_ci NOT NULL,
  `article_last_edit_time` int(11) NOT NULL,
  PRIMARY KEY (`article_num`),
  KEY `idx_article_title` (`article_title`),
  KEY `idx_article_last_ip` (`article_last_ip`),
  KEY `idx_article_hash` (`article_hash`),
  KEY `idx_revision_num` (`revision_num`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

LOCK TABLES `wiki_articles` WRITE;
/*!40000 ALTER TABLE `wiki_articles` DISABLE KEYS */;

INSERT INTO `wiki_articles` (`article_num`, `revision_num`, `article_title`, `article_hash`, `article_content`, `article_last_ip`, `article_last_member_id`, `article_last_member_nickname`, `article_etc_info`, `article_last_edit_time`)
VALUES
	(1,4,'대문','64yA66y4','== openRoot ==\r\nopenRoot는 나무위키의 the seed 엔진을 오픈소스로 구현하기 위한 프로젝트인 openNAMU 프로젝트의 포크 프로젝트입니다.\r\n\r\n== 기여하기 ==\r\n[[https://github.com/YJSoft/openRoot/issues|이슈 트래커]]에 이슈를 제보해 주세요.\r\n\r\n== 라이센스 ==\r\n별도의 명시가 없다면 MIT 라이센스를 따릅니다.\r\n{{{ Copyright (c) 2016 Jeon-Sung\r\n\r\nPermission is hereby granted, free of charge, to any person\r\nobtaining a copy of this software and associated documentation\r\nfiles (the \"Software\"), to deal in the Software without\r\nrestriction, including without limitation the rights to use,\r\ncopy, modify, merge, publish, distribute, sublicense, and/or sell\r\ncopies of the Software, and to permit persons to whom the\r\nSoftware is furnished to do so, subject to the following\r\nconditions:\r\n\r\nThe above copyright notice and this permission notice shall be\r\nincluded in all copies or substantial portions of the Software.\r\n\r\nTHE SOFTWARE IS PROVIDED \"AS IS\", WITHOUT WARRANTY OF ANY KIND,\r\nEXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES\r\nOF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND\r\nNONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT\r\nHOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY,\r\nWHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING\r\nFROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR\r\nOTHER DEALINGS IN THE SOFTWARE. }}}','::ffff:127.0.0.1',0,'admin','wikiPage.canEdit=true;wikiPage.canMove=true;wikiPage.canDelete=true;',0);

/*!40000 ALTER TABLE `wiki_articles` ENABLE KEYS */;
UNLOCK TABLES;


# Dump of table wiki_revision
# ------------------------------------------------------------

DROP TABLE IF EXISTS `wiki_revision`;

CREATE TABLE `wiki_revision` (
  `revision_num` int(11) NOT NULL,
  `revision_article_num` int(11) NOT NULL,
  `revision_title` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '',
  `revision_hash` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '',
  `revision_content` longtext COLLATE utf8mb4_unicode_ci NOT NULL,
  `revision_comment` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `revision_ip` varchar(50) COLLATE utf8mb4_unicode_ci NOT NULL,
  `revision_member_id` int(11) NOT NULL,
  `revision_member_nick` varchar(50) COLLATE utf8mb4_unicode_ci NOT NULL,
  `revision_edit_time` int(11) NOT NULL,
  PRIMARY KEY (`revision_num`),
  KEY `idx_revision_title` (`revision_title`),
  KEY `idx_revision_ip` (`revision_ip`),
  KEY `idx_article_num` (`revision_article_num`),
  KEY `idx_revision_hash` (`revision_hash`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

LOCK TABLES `wiki_revision` WRITE;
/*!40000 ALTER TABLE `wiki_revision` DISABLE KEYS */;

INSERT INTO `wiki_revision` (`revision_num`, `revision_article_num`, `revision_title`, `revision_hash`, `revision_content`, `revision_comment`, `revision_ip`, `revision_member_id`, `revision_member_nick`, `revision_edit_time`)
VALUES
	(1,1,'대문','64yA66y4','== openNAMU ==\nopenNAMU는 나무위키의 the seed 엔진을 오픈소스로 구현하기 위한 프로젝트입니다.','대문 문서 만듬','127.0.0.1',0,'admin',1462018043),
	(2,1,'대문','64yA66y4','== openNAMU ==\nopenNAMU는 나무위키의 the seed 엔진을 오픈소스로 구현하기 위한 프로젝트입니다.\n\n== 기여하기 ==\n[[https://github.com/YJSoft/openNAMU/issues|이슈 트래커]]에 이슈를 제보해 주세요.','이슈 트래커 주소 추가','127.0.0.1',0,'admin',1462018043),
	(3,1,'대문','64yA66y4','== openNAMU ==\nopenNAMU는 나무위키의 the seed 엔진을 오픈소스로 구현하기 위한 프로젝트입니다.\n\n== 기여하기 ==\n[[https://github.com/YJSoft/openNAMU/issues|이슈 트래커]]에 이슈를 제보해 주세요.\n\n== 라이센스 ==\n별도의 명시가 없다면 MIT 라이센스를 따릅니다.\n{{{ Copyright (c) 2016 Jeon-Sung\n\nPermission is hereby granted, free of charge, to any person\nobtaining a copy of this software and associated documentation\nfiles (the \"Software\"), to deal in the Software without\nrestriction, including without limitation the rights to use,\ncopy, modify, merge, publish, distribute, sublicense, and/or sell\ncopies of the Software, and to permit persons to whom the\nSoftware is furnished to do so, subject to the following\nconditions:\n\nThe above copyright notice and this permission notice shall be\nincluded in all copies or substantial portions of the Software.\n\nTHE SOFTWARE IS PROVIDED \"AS IS\", WITHOUT WARRANTY OF ANY KIND,\nEXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES\nOF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND\nNONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT\nHOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY,\nWHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING\nFROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR\nOTHER DEALINGS IN THE SOFTWARE. }}}','라이센스 추가','127.0.0.1',0,'admin',1462018043),
	(4,1,'대문','64yA66y4','== openRoot ==\r\nopenRoot는 나무위키의 the seed 엔진을 오픈소스로 구현하기 위한 프로젝트인 openNAMU 프로젝트의 포크 프로젝트입니다.\r\n\r\n== 기여하기 ==\r\n[[https://github.com/YJSoft/openRoot/issues|이슈 트래커]]에 이슈를 제보해 주세요.\r\n\r\n== 라이센스 ==\r\n별도의 명시가 없다면 MIT 라이센스를 따릅니다.\r\n{{{ Copyright (c) 2016 Jeon-Sung\r\n\r\nPermission is hereby granted, free of charge, to any person\r\nobtaining a copy of this software and associated documentation\r\nfiles (the \"Software\"), to deal in the Software without\r\nrestriction, including without limitation the rights to use,\r\ncopy, modify, merge, publish, distribute, sublicense, and/or sell\r\ncopies of the Software, and to permit persons to whom the\r\nSoftware is furnished to do so, subject to the following\r\nconditions:\r\n\r\nThe above copyright notice and this permission notice shall be\r\nincluded in all copies or substantial portions of the Software.\r\n\r\nTHE SOFTWARE IS PROVIDED \"AS IS\", WITHOUT WARRANTY OF ANY KIND,\r\nEXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES\r\nOF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND\r\nNONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT\r\nHOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY,\r\nWHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING\r\nFROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR\r\nOTHER DEALINGS IN THE SOFTWARE. }}}','edit page 대문','::ffff:127.0.0.1',0,'',0);

/*!40000 ALTER TABLE `wiki_revision` ENABLE KEYS */;
UNLOCK TABLES;



/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;
/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
