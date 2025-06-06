import Scholarship from '../models/Scholarship.model.js';
import StudentDetails from '../models/StudentDetail.model.js';

//Add new Scholarship by HOD
export const addScholarship = async(req,res)=>{
    const {name, date, amount} = req.body;

    if(!name|| !date ||!amount)
    {
        return res.status(400).json({message: 'Please Provide All Details First'});
    }
    try{
        const scholarship = new Scholarship({
            name,
            amount,
            examDate: date,
            participatedStudents: [],
            approvedStudents: [],
            status: 'Pending'
        });
        await scholarship.save();
        res.status(200).json({message: 'Scholarship Added Successfully!', scholarship: scholarship})
    }
    catch(error)
    {
        res.status(500).json({message: 'Internal Server Error'});
    }
}

//Participate in Scholarship by student
export const participateScholarship = async(req,res)=>{
    const {studentId, scholarshipId} = req.body;

    if(!studentId|| !scholarshipId)
    {
        return res.status(400).json({message: 'Please Provide Correct Student and Scholarship ID'});
    }
    try
    {
        const scholarship = await Scholarship.findById(scholarshipId);
        
        scholarship.participatedStudents.push(studentId);

        await scholarship.save();

        res.status(200).json({message: `You have Successfully pariticipated in ${scholarship.name}`});
    }
    catch(error)
    {
        res.status(500).json({message: 'Internal Server Error Occured'});
    }
}

//Fetch all scholarships where student has participated
export const scholarshipsWithParticipation = async(req,res) =>{
    const {studentId} = req.params;

    if(!studentId)
    {
        return res.status(404).json({message: 'Please Provide Valid Student ID'});
    }
    try
    {
        const scholarships = await Scholarship.find({
            participatedStudents: studentId
        });

        if(scholarships.length === 0)
        {
            return res.status(200).json({success: false, message: 'No Scholarships Exist Where Participation is Done'});
        }
        res.status(200).json({success: true, scholarships: scholarships})
    }
    catch(error)
    {
        res.status(500).json({message: 'Internal Server Error Occured'});
    }
}

//Fetch all Students where Student has not participated
export const scholarshipsWithoutParticipation = async(req,res) =>{
    const {studentId} = req.params;

    if(!studentId)
    {
        return res.status(404).json({message: 'Please Provide Valid Student ID'});
    }
    try
    {
        const scholarships = await Scholarship.find({
            participatedStudents: {$nin: [studentId]}
        });

        if(scholarships.length === 0)
        {
            return res.status(200).json({success: false, message: 'No New Scholarships Exist'});
        }
        res.status(200).json({success: true, scholarships: scholarships})
    }
    catch(error)
    {
        res.status(500).json({message: 'Internal Server Error Occured'});
    }
}

//Fetch all Students of a Scholarship who have participated
export const fetchAllParticipatedStudents = async(req,res)=>{
    const {scholarshipId} = req.params;

    if(!scholarshipId)
    {
        return res.status(404).json({message: 'Invalid Scholarship ID Found'});
    }
    try
    {
        const scholarship = await Scholarship.findById(scholarshipId).populate('participatedStudents','name');

        if(!scholarship)
        {
            return res.status(400).json({message: 'No Scholarship Found'});
        }
        res.status(200).json({studentsParticipated: scholarship.participatedStudents});
    }
    catch(error)
    {
        res.status(500).json({message: 'Internal Server Error Occured'});
    }
}

//Fetch the list of scholarships which are 'Pending'
export const fetchByStatus = async (req, res) => {
    const {status} = req.params;
    if(!status)
    {
        return res.status(404).json({message: 'Please Provide Status'});
    }
    try{
        const scholarships = await Scholarship.find({status});
        if (scholarships.length === 0) {
            return res.status(200).json({ success: false, message: 'No Scholarships Available' });
        }

        res.status(200).json({ success: true, scholarships: scholarships });
    } catch (error) {

        res.status(500).json({ message: 'Internal Server Error Occurred' });
    }
};

//Approve the students by HOD
export const approveStudents = async (req, res) => {
    const { scholarshipId, studentIds } = req.body;
  
    if (!scholarshipId || !studentIds || studentIds.length === 0) {
      return res.status(400).json({ message: 'Please provide valid scholarship ID and student IDs' });
    }
  
    try {
      const scholarship = await Scholarship.findById(scholarshipId);
  
      if (!scholarship) {
        return res.status(404).json({ message: 'Scholarship not found' });
      }

      const invalidStudents = studentIds.filter(studentId => !scholarship.participatedStudents.includes(studentId));
  
      if (invalidStudents.length > 0) {
        return res.status(400).json({ message: `The following students have not participated in the scholarship: ${invalidStudents.join(', ')}` });
      }
  
      scholarship.approvedStudents.push(...studentIds);
      scholarship.status = 'Approved';
      await scholarship.save();
  
      res.status(200).json({ message: 'Students approved successfully!', scholarship });
    } catch (error) {
      res.status(500).json({ message: 'Internal Server Error Occurred' });
    }
  };

//Payment of Student by Super Admin
export const payStudents = async(req,res)=>{
    const {scholarshipId} = req.params;
    if(!studentId)
    {
        return res.status(404).json({message: 'Provide Proper Student ID'});
    }
    try
    {
        const scholarship = await Scholarship.findOne(scholarshipId);
        if(!scholarship)
        {
            return res.status(404).json({message: 'Cannot Find Scholarship'});
        }
        for(const studentId of scholarship.approvedStudents)
        {
            const student = await StudentDetails.findOne({studentId});
            student.walletBalance += Number.parseInt(scholarship.amount);
            await student.save();
        }
        res.status(200).json({message: 'Students Paid Successfully'})
    }
    catch(error)
    {
        console.log('Error Occured While Paying Students: '+error);
        res.status(500).json({message: 'Internal Server Error Occurred'})
    }
}


  