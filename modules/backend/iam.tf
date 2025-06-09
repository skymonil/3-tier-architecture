resource "aws_iam_role" "ec2_ssm_role" {
  name = "EC2SSMAccessRole"

  assume_role_policy = jsonencode({
    Version = "2012-10-17",
    Statement = [{
      Effect = "Allow",
      Principal = {
        Service = "ec2.amazonaws.com"
      },
      Action = "sts:AssumeRole"
    }]
  })
}

resource "aws_iam_policy" "kms_decrypt_policy" {
  name        = "KMSDecryptPolicy"
  description = "Allow EC2 role to decrypt SSM secrets"
  policy = jsonencode({
    Version = "2012-10-17",
    Statement = [
      {
        Action = [
          "kms:Decrypt"
        ],
        Resource = aws_kms_key.ssm_kms_key.arn,
        Effect   = "Allow"
      }
    ]
  })
}

resource "aws_iam_policy_attachment" "kms_decrypt_attach" {
  name       = "AttachKMSDecryptPolicy"
  roles      = [aws_iam_role.ec2_ssm_role.name]
  policy_arn = aws_iam_policy.kms_decrypt_policy.arn
}


resource "aws_kms_key_policy" "ssm_kms_policy" {
  key_id = aws_kms_key.ssm_kms_key.id
  policy = jsonencode({
    Statement = [{
      Effect    = "Allow",
      Principal = {
        AWS = "arn:aws:iam::975049978724:role/EC2SSMAccessRole"
      },
      Action = [
        "kms:Decrypt"
      ],
      Resource = "*"
    }]
  })
}

resource "aws_iam_policy_attachment" "ssm_access" {
  name       = "SSMAccess"
  roles      = [aws_iam_role.ec2_ssm_role.name]
  policy_arn = "arn:aws:iam::aws:policy/AmazonSSMManagedInstanceCore"
}

resource "aws_iam_instance_profile" "ec2_profile" {
  name = "EC2InstanceProfile"
  role = aws_iam_role.ec2_ssm_role.name
}