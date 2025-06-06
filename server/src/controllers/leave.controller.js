import Leave from '../models/Leave.model.js';

export const addLeave = async(req,res)=>{
    const {studentId, startDate, endDate, reason} = req.body;

    if(!studentId|| !startDate|| !endDate|| !reason)
    {
        return res.status(400).json({message: 'Please Provide All Details!'})
    }
    try
    {
        const start = new Date(startDate);  // Convert "YYYY-MM-DD" to MONGODB Compatible Format
        const end = new Date(endDate);   
        
        const leave = new Leave({
            studentId,
            startDate: start,
            endDate: end,
            reason,
            status: 'Pending'
        });

        const savedLeave = await leave.save();

        res.status(200).json({
            message: 'Added Leave Successfully',
            leave: savedLeave
        });
    }
    catch(error)
    {
        console.log('Error While Adding Leave: '+error);
        res.status(500).json({message: 'Internal Server Error Occured!'});
    }
}

export const fetchLeave = async(req,res) =>{
    try
    {
        const leaves = await Leave.find();

        if(leaves.length === 0)
        {
            return res.status(200).json({
                success: false,
                message: 'Leave Requests Does not Exist'
            });
        }

        res.status(200).json({
            success: true,
            leaves,
        });
    }
    catch(error)
    {
        console.log('Error Occured While Fetching Leave '+error);
        res.status(500).json({message: 'Internal Server Error Occured!'})
    }
}

export const approveLeave = async(req,res)=>{
    const {leaveId} = req.params;

    if(!leaveId)
    {
        return res.status(400).json({message: 'Leave ID is Required!'});
    }
    try
    {
        const leave = await Leave.findById(leaveId);

        if(!leave)
        {
            return res.status(404).json({message: 'Leave Request not Found!'});
        }

        leave.status = 'Approved';

        await leave.save();

        res.status(200).json({
            message: 'Leave Approved Successfully!',
            leave
        });
    }
    catch(error)
    {
        console.log('Error Occured while Approving Leave: '+error);
        res.status(500).json({message: 'Internal Server Error Occurred!'});
    }
}

export const rejectLeave = async(req,res)=>{
    const {leaveId} = req.params;

    if(!leaveId)
    {
        return res.status(400).json({message: 'Leave ID is Required!'});
    }
    try
    {
        const leave = await Leave.findById(leaveId);

        if(!leave)
        {
            return res.status(404).json({message: 'Leave Request not Found!'});
        }

        leave.status = 'Rejected';

        await leave.save();

        res.status(200).json({
            message: 'Leave Reject Success',
            leave
        });
    }
    catch(error)
    {
        console.log('Error Occured while Rejecting Leave: '+error);
        res.status(500).json({message: 'Internal Server Error Occurred!'});
    }
}

export const fetchLeaveByStudent = async (req, res) => {
    const { studentId } = req.params; 

    if (!studentId) {
        return res.status(400).json({ message: 'Student ID is required!' });
    }

    try {
        const leaves = await Leave.find({ studentId });

        if (leaves.length === 0) {
            return res.status(200).json({
                success: false,
                message: 'No leave requests found for this student'
            });
        }

        res.status(200).json({
            success: true,
            leaves
        });
    } catch (error) {
        console.log('Error occurred while fetching leave by student:', error);
        res.status(500).json({ message: 'Internal Server Error Occurred!' });
    }
}
