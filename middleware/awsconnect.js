
const aws = require(`aws-sdk`);
const multer = require('multer');
const multerS3 = require(`multer-s3`);
require('dotenv').config();


const s3 = new aws.S3({
	accessKeyId: process.env.AWS_ACCESS_KEY_ID,
	secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
	region: 'eu-west-2',
});

​
const uploadAvatar = multer({
	storage: multerS3({
		s3: s3,
		bucket: process.env.AWS_BUCKET,
		contentType: multerS3.AUTO_CONTENT_TYPE,
		metadata: function (req, file, cb) {
			cb(null, { fieldName: file.fieldname });
		},
		key: function (req, file, cb) {
			cb(null, `avatar/${Date.now().toString()}`);
		},
		fileFilter: function (req, file, callback) {
			let ext = path.extname(file.originalname);
			if (
				ext !== '.png' &&
				ext !== '.jpg' &&
				ext !== '.gif' &&
				ext !== '.jpeg'
			) {
				return callback(new Error('Only images are allowed'));
			}
			callback(null, true);
		},
	}),
	limits: { fileSize: 40000000 }, //In bytes: Limited to 5mb
});
​

module.exports = { uploadAvatar, s3 };